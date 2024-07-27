import Search from "../assets/icons/search-svgrepo-com.svg";
import { useSearchBar } from "../hooks/useSearchBar";

export interface SearchBarProps {
    startLoading: () => void;
    cancelLoading: () => void;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    setLimit: React.Dispatch<React.SetStateAction<number>>;
    setSelectedMovie: React.Dispatch<React.SetStateAction<Array<number | string> | null>>;
}

export default function SearchBar(props: SearchBarProps): JSX.Element {
    const { tempTitle, handleTempTitleChange, handleKeyDown } = useSearchBar(props);
    return (
        <form className="flex items-center space-x-4 lg:mx-12 mx-6 mt-6 px-6 py-4 text-black text-xl bg-white rounded-full" autoComplete="off">
          <img src={Search} alt="" className="w-5" />
          <input 
          className="bg-transparent text-black focus:outline-none w-full"
          type="text" 
          name="title"
          id="title" 
          value={tempTitle} 
          onChange={handleTempTitleChange}
          onKeyDown={handleKeyDown} 
          placeholder="Enter keywords..."/>
        </form>
    )
}