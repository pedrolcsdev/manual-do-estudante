"use client";

import type { Map as LeafletMap, Marker } from "leaflet";
import Link from "next/link";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { campusBoundary, type CampusSector } from "@/content/campus";
import "leaflet/dist/leaflet.css";

const osmAttribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export function CampusMap({
  points,
  initialPoint,
  lazy = false,
}: {
  points: CampusSector[];
  initialPoint?: string;
  lazy?: boolean;
}) {
  const container = useRef<HTMLDivElement>(null);
  const layerPicker = useRef<HTMLDivElement>(null);
  const markers = useRef(new Map<string, Marker>());
  const [selected, setSelected] = useState(initialPoint);
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );
  const [tileError, setTileError] = useState(false);
  const openSelectedPoint = useEffectEvent(() => {
    if (selected) markers.current.get(selected)?.openPopup();
  });

  useEffect(() => {
    const element = container.current;
    const picker = layerPicker.current;
    if (!element || !picker) return;

    let cancelled = false;
    let observer: ResizeObserver | undefined;
    let map: LeafletMap | undefined;
    const markerList = markers.current;

    const load = () =>
      import("leaflet")
        .then((L) => {
          if (cancelled) return;

          const instance = L.map(element, {
            zoomControl: false,
            scrollWheelZoom: false,
            minZoom: 16,
            maxZoom: 19,
          });
          map = instance;
          L.control
            .zoom({ zoomInTitle: "Aproximar", zoomOutTitle: "Afastar" })
            .addTo(instance);
          instance.attributionControl.setPrefix(false);
          const streets = L.tileLayer(
            "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            {
              maxZoom: 19,
              attribution: osmAttribution,
            },
          );
          // shortcut: Sentinel-2 is 10 m imagery for the prototype; use licensed high-resolution imagery for building detail.
          const satellite = L.tileLayer(
            "https://tiles.maps.eox.at/wmts/1.0.0/s2cloudless-2025_3857/default/g/{z}/{y}/{x}.jpg",
            {
              maxNativeZoom: 14,
              maxZoom: 19,
              attribution:
                '<a href="https://cloudless.eox.at/">EOxCloudless</a> by EOX IT Services GmbH (Contains modified Copernicus Sentinel data 2025)',
            },
          );

          for (const layer of [streets, satellite]) {
            layer
              .on("loading", () => setTileError(false))
              .on("tileerror", () => setTileError(true));
          }
          streets.addTo(instance);
          const layers = L.control
            .layers({ Ruas: streets, Satélite: satellite }, undefined, {
              collapsed: false,
            })
            .addTo(instance);
          const controls = layers.getContainer();
          if (controls) picker.append(controls);

          const boundary = L.polygon(campusBoundary, {
            color: "#28549c",
            weight: 3,
            fillOpacity: 0.15,
            interactive: false,
            attribution: osmAttribution,
          }).addTo(instance);
          instance.on("baselayerchange", ({ layer }) => {
            setTileError(false);
            boundary.setStyle({
              color: layer === satellite ? "#ffe183" : "#28549c",
            });
          });
          instance.fitBounds(boundary.getBounds(), {
            padding: [24, 24],
            maxZoom: 17,
          });

          points.forEach((point, index) => {
            const icon = L.divIcon({
              className: "campus-pin",
              html: `<span aria-hidden="true">${index + 1}</span>`,
              iconSize: [44, 48],
              iconAnchor: [22, 45],
              popupAnchor: [0, -41],
            });
            const marker = L.marker(point.position, {
              icon,
              title: point.name,
            }).addTo(instance);
            marker.getElement()?.setAttribute("aria-label", point.name);

            const popup = document.createElement("div");
            const name = document.createElement("strong");
            const location = document.createElement("span");
            name.textContent = point.name;
            location.textContent = point.location;
            popup.className = "campus-popup";
            popup.append(name, location);
            if (point.orientation) {
              const guide = document.createElement("a");
              guide.href = `/setores/${point.slug}`;
              guide.textContent = "Ver tópicos do setor";
              popup.append(guide);
            }
            marker.bindPopup(popup).on("click", () => setSelected(point.slug));
            markerList.set(point.slug, marker);
          });

          observer = new ResizeObserver(() =>
            instance.invalidateSize({ pan: false }),
          );
          observer.observe(element);
          openSelectedPoint();
          setStatus("ready");
        })
        .catch(() => {
          if (!cancelled) setStatus("error");
        });

    const visibility = lazy
      ? new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting) return;
            visibility?.disconnect();
            void load();
          },
          { rootMargin: "200px" },
        )
      : undefined;
    if (visibility) visibility.observe(element);
    else void load();

    return () => {
      cancelled = true;
      visibility?.disconnect();
      observer?.disconnect();
      map?.remove();
      markerList.clear();
    };
  }, [points, lazy]);

  const activePoint = points.find(({ slug }) => slug === selected);
  const DirectoryHeading = lazy ? "h3" : "h2";

  return (
    <div className="mt-6 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(250px,300px)]">
      <section
        aria-labelledby="campus-points"
        className="self-start rounded-xl border border-line bg-white p-4 md:col-start-2 md:row-start-1"
      >
        <DirectoryHeading
          id="campus-points"
          className="px-2 text-lg font-bold text-blue"
        >
          Setores do campus
        </DirectoryHeading>
        <ul className="mt-3 space-y-1">
          {points.map((point, index) => (
            <li key={point.slug}>
              <button
                type="button"
                aria-pressed={point.slug === selected}
                onClick={() => {
                  setSelected(point.slug);
                  markers.current.get(point.slug)?.openPopup();
                }}
                className="flex min-h-11 w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-left text-sm font-semibold text-blue hover:bg-blue/5 aria-pressed:bg-blue/10"
              >
                <span
                  aria-hidden="true"
                  className="grid size-6 shrink-0 place-items-center rounded-full bg-blue text-xs text-white"
                >
                  {index + 1}
                </span>
                <span>
                  {point.name}
                  {point.locationPending && (
                    <small className="mt-1 block text-xs font-normal leading-5 text-ink/75">
                      {point.location}
                    </small>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
        {activePoint && (
          <div className="mt-4 border-t border-line px-2 pt-4">
            <p aria-live="polite" className="text-sm leading-6 text-ink/85">
              <strong className="block text-blue">{activePoint.name}</strong>
              {activePoint.location}
            </p>
            <Link
              href={`/setores/${activePoint.slug}`}
              className="mt-2 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-blue underline underline-offset-4"
            >
              Ver tópicos do setor <span aria-hidden="true">→</span>
            </Link>
          </div>
        )}
      </section>
      <section
        aria-label="Mapa interativo do campus"
        className="min-w-0 md:col-start-1 md:row-start-1"
      >
        <div
          ref={layerPicker}
          role="group"
          aria-label="Visualização do mapa"
          className="campus-layer-picker mb-3 flex justify-end empty:hidden"
        />
        <div className="relative isolate overflow-hidden rounded-xl border border-line bg-[#e8eef4]">
          <div ref={container} className="h-[390px] md:h-[480px]" />
          {status !== "ready" && (
            <p
              role="status"
              className="pointer-events-none absolute inset-0 grid place-items-center px-5 text-center text-sm text-blue"
            >
              {status === "loading"
                ? "Carregando mapa…"
                : "Mapa indisponível. Você pode consultar os pontos na lista."}
            </p>
          )}
        </div>
        {tileError && (
          <p role="status" className="mt-2 text-sm text-ink/80">
            Parte do mapa-base está indisponível. O contorno e os pontos
            continuam visíveis.
          </p>
        )}
      </section>
    </div>
  );
}
