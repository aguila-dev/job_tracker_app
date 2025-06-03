// LocationDropdown.js

import { LocationDropdownProps } from '@/interface/ILocationDropdown'
import { useState } from 'react'

const LocationDropdown = ({
  locations,
  selectedLocations,
  onLocationChange,
}: LocationDropdownProps) => {
  const [activeLocation, setActiveLocation] = useState<boolean>(false)

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) => {
    onLocationChange(event.target.value, event.target.checked, type)
  }

  return (
    <div className="relative z-50 text-center">
      <button type="button" onClick={() => setActiveLocation((prev) => !prev)}>
        Locations
      </button>
      <div
        id="dropdownLocationsMenu"
        className={`absolute z-50 mt-1 max-h-96 w-64 overflow-y-auto rounded border border-gray-200 bg-white shadow-lg ${
          activeLocation ? 'flex flex-col' : 'hidden'
        }`}
      >
        {locations.map((location: any) => (
          <div
            key={location.id}
            className="flex items-center p-2 hover:bg-gray-100"
          >
            <input
              type="checkbox"
              id={location.id}
              value={location.id}
              className="mr-2"
              onChange={(e) => handleCheckboxChange(e, 'locations')}
              checked={selectedLocations.includes(location.id)}
            />
            <label htmlFor={location.id} className="flex-grow cursor-pointer">
              {location.descriptor}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LocationDropdown
