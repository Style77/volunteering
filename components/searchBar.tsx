/* eslint-disable react/react-in-jsx-scope */
import { FormEvent, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { cities, volunteeringTerms, volunteeringTypes } from "../constants"

type Props = {
  volunteeringsData: Record<string, any>
  setVolunteeringsData: Function
  allVolunteeringsData: Record<string, any>
  setIsLoading: Function
}

export const SearchBar = ({
  allVolunteeringsData,
  setVolunteeringsData,
  setIsLoading
}: Props) => {
  const [searchCity, setSearchCity] = useState("")
  const [searchType, setSearchType] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  const handleSubmit = (e: FormEvent) => {
    setIsLoading(true)
    e.preventDefault()
    let filtered = allVolunteeringsData

    if (searchCity) {
      filtered = filtered.filter(
        (volunteering: Record<string, any>) =>
          volunteering.city.toLowerCase() === searchCity.toLowerCase()
      )
    }
    if (searchType) {
      filtered = filtered.filter(
        (volunteering: Record<string, any>) =>
          volunteering.type.toLowerCase() === searchType.toLowerCase()
      )
    }
    if (searchTerm) {
      filtered = filtered.filter(
        (volunteering: Record<string, any>) =>
          volunteering.term.toLowerCase() === searchTerm.toLowerCase()
      )
    }
    
    setVolunteeringsData(filtered)
    setIsLoading(false)
  }
  return (
    <>
      <div className="flex flex-col md:flex-row font-inter font-light justify-center mx-6">
        <div className="flex flex-col md:flex-row gap-3 w-full items-center">
          <div className="flex flex-col w-80">
            <label htmlFor="search-city" className="text-main-color ">
              Miasto
            </label>
            <select
              id="search-city"
              onChange={(e) => setSearchCity(e.target.value)}
              className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
            >
              <option selected value="">
                Wybierz
              </option>
              {cities.map((city: any) => (
                <option value={city} key={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="search-type" className="text-main-color ">
              Typ
            </label>
            <select
              id="search-type"
              onChange={(e) => setSearchType(e.target.value)}
              className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
            >
              <option selected value="">
                Wybierz
              </option>
              {Object.entries(volunteeringTypes).map(([key, value]: any) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col w-80">
            <label htmlFor="search-term" className="text-main-color ">
              Okres
            </label>
            <select
              id="search-term"
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-12 rounded-lg bg-white border-2 text-main-color border-main-color hover:border-main-color-2 focus:rounded-xl p-2"
            >
              <option selected value="">
                Wybierz
              </option>

              {Object.entries(volunteeringTerms).map(([key, value]: any) => (
                <option value={key} key={key}>
                  {value}
                </option>
              ))}
            </select>
          </div>
          <button
            className="flex flex-row rounded-lg bg-main-color disabled:bg-zinc-300 disabled:hover:scale-100 text-white h-12 w-40 text-xl justify-center items-center mt-[1.9rem] transition ease-in-out hover:scale-110 hover:bg-main-color-2 duration-300 my-2"
            onClick={handleSubmit}
          >
            <div className="px-2">Szukaj</div>
            <div>
              <FiSearch />
            </div>
          </button>
        </div>
      </div>
    </>
  )
}
