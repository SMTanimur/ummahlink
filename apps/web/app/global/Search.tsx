'use client';

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { useRef, useState } from 'react';
import { Input } from '../components/ui/input';

interface SearchProps {
  hideDropdown?: boolean;
  onProfileSelected?: (profile: any) => void;
  placeholder?: string;
  modalWidthClassName?: string;
}

const Search: FC<SearchProps> = ({
  hideDropdown = false,
  onProfileSelected,
  placeholder = `Search…`,
  modalWidthClassName = 'max-w-md',
}) => {
  const { push } = useRouter();
  const [searchText, setSearchText] = useState('');
  const dropdownRef = useRef(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  // useOnClickOutside(dropdownRef, () => setSearchText(''));

  // const [searchUsers, { data: searchUsersData, loading: searchUsersLoading }] =
  //   useSearchProfilesLazyQuery();

  const handleSearch = (evt: ChangeEvent<HTMLInputElement>) => {
    const keyword = evt.target.value;
    setSearchText(keyword);
    if (pathname !== '/search' && !hideDropdown) {
      // searchUsers({
      //   variables: {
      //     request: {
      //       type: SearchRequestTypes.Profile,
      //       query: keyword,
      //       customFilters: [CustomFiltersTypes.Gardeners],
      //       limit: 8
      //     }
      //   }
      // });
    }
  };

  const handleKeyDown = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (pathname === '/search') {
      push(`/search?q=${encodeURIComponent(searchText)}&type=${searchParams}`);
    } else {
      push(`/search?q=${encodeURIComponent(searchText)}&type=profiles`);
    }
    setSearchText('');
  };

  // const searchResult = searchUsersData?.search as ProfileSearchResult;
  // const isProfileSearchResult =
  //   searchResult && searchResult.hasOwnProperty('items');
  // const profiles = isProfileSearchResult ? searchResult.items : [];

  return (
    <div aria-hidden="true" className="w-full" data-testid="global-search">
      <form onSubmit={handleKeyDown}>
        <Input
          type="text"
          className="px-3 py-2 text-sm"
          placeholder={placeholder}
          value={searchText}
          iconLeft={<MagnifyingGlassIcon />}
          iconRight={
            <XMarkIcon
              className={clsx(
                'cursor-pointer',
                searchText ? 'visible' : 'invisible'
              )}
              onClick={() => setSearchText('')}
            />
          }
          onChange={handleSearch}
        />
      </form>
      {pathname !== '/search' && !hideDropdown && searchText.length > 0 && (
        <div
          className={clsx(
            'absolute mt-2 flex w-[94%] flex-col',
            modalWidthClassName
          )}
          ref={dropdownRef}
          data-testid="search-profiles-dropdown"
        ></div>
      )}
    </div>
  );
};

export default Search;
