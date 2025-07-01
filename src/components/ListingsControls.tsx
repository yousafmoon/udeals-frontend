"use client";

interface ListingsControlsProps {
  locations: string[];
  services: string[];
  selectedLocation: string;
  selectedService: string;
  selectedListing: string;
  onSortChange: (type: string, value: string) => void;
  onLayoutChange: (layout: "grid" | "list") => void;
}

export default function ListingsControls({
  locations,
  services,
  selectedLocation,
  selectedService,
  selectedListing,
  onSortChange,
  onLayoutChange,
}: ListingsControlsProps) {
  return (
    <div className="section-bg w-full py-4 px-4 sm:px-6 md:px-10">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Layout Switcher */}
        <div className="flex gap-3">
          <button
            onClick={() => onLayoutChange("grid")}
            className="cursor-pointer"
          >
            <img
              src="/icons/grid-style.svg"
              alt="Grid"
              className="w-[45px] h-[45px]"
            />
          </button>
          <button
            onClick={() => onLayoutChange("list")}
            className="cursor-pointer"
          >
            <img
              src="/icons/list-style.svg"
              alt="List"
              className="w-[45px] h-[45px]"
            />
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 w-full lg:w-auto">
          {/* Location Filter */}
          <div className="relative w-full sm:w-[48%] md:w-[240px]">
            <select
              className="bg-black text-white w-full h-12 px-4 py-2 pr-10 rounded appearance-none"
              value={selectedLocation}
              onChange={(e) => onSortChange("location", e.target.value)}
            >
              <option value="">Sort by Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M96 192h128c17.7 0 26.7 21.5 14.1 34.1l-64 64c-7.5 7.5-19.8 7.5-27.3 0l-64-64C69.3 213.5 78.3 192 96 192z" />
              </svg>
            </div>
          </div>

          {/* Listing Filter */}
          <div className="relative w-full sm:w-[48%] md:w-[240px]">
            <select
              className="bg-black text-white w-full h-12 px-4 py-2 pr-10 rounded appearance-none"
              value={selectedListing}
              onChange={(e) => onSortChange("listing", e.target.value)}
            >
              <option value="">Sort by Listing</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="price_asc">Price Low to High</option>
              <option value="price_desc">Price High to Low</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M96 192h128c17.7 0 26.7 21.5 14.1 34.1l-64 64c-7.5 7.5-19.8 7.5-27.3 0l-64-64C69.3 213.5 78.3 192 96 192z" />
              </svg>
            </div>
          </div>

          {/* Services Filter */}
          <div className="relative w-full sm:w-[48%] md:w-[240px]">
            <select
              className="bg-black text-white w-full h-12 px-4 py-2 pr-10 rounded appearance-none"
              value={selectedService}
              onChange={(e) => onSortChange("services", e.target.value)}
            >
              <option value="">Sort by Services</option>
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg
                className="w-5 h-4 text-white"
                fill="currentColor"
                viewBox="0 0 320 512"
              >
                <path d="M96 192h128c17.7 0 26.7 21.5 14.1 34.1l-64 64c-7.5 7.5-19.8 7.5-27.3 0l-64-64C69.3 213.5 78.3 192 96 192z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
