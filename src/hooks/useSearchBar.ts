import { ChangeEvent, useState } from "react"
import { SearchBarProps } from "../components/SearchBar";

export function useSearchBar(props: SearchBarProps) {
    const {startLoading, cancelLoading, setSelectedMovie, setTitle, setLimit} = props
    const [tempTitle, setTempTitle] = useState<string>('');
    const handleTempTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setTempTitle(e.target.value);
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter')  {
          e.preventDefault();
          startLoading();
          setSelectedMovie(null);
          setTitle(tempTitle);
          setLimit(10);
          cancelLoading();
        }
      }
    return {
        tempTitle,
        handleTempTitleChange,
        handleKeyDown,
    };
}