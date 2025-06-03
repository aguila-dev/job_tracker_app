interface Location {
  id: string
  descriptor?: string
}
export interface LocationDropdownProps {
  locations: Location[]
  selectedLocations: string[]
  onLocationChange: (id: string, checked: boolean, type: string) => void
}
