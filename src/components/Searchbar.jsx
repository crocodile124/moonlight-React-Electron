import { useContext, useState } from 'react';
import { MovieContext } from '../App';

const Searchbar = () => {
  const [value, setValue] = useState('');
  const movieContext = useContext(MovieContext);
  const setSearchValue = movieContext.setSearchValue;

  const onchange = (e) => {
    setValue(e.target.value);
    setSearchValue(e.target.value);
  }
  return (
    <div className="m-2">
      <div className="ml-2 relative">
        <div className="xl:w-full lg:w-full md:w-full w-10/12">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input onChange={onchange} value={value} type="search" id="default-search" className="w-full block p-[10px] pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
        </div>
      </div>
    </div>
  )
};

export default Searchbar;