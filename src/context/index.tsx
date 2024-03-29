import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface PaginationContextType {
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const PaginationContext = createContext<PaginationContextType>({
  currentPage: 1,
  setCurrentPage: () => {},
} as unknown as PaginationContextType);

export default function PaginationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <PaginationContext.Provider value={{ currentPage, setCurrentPage }}>
      {children}
    </PaginationContext.Provider>
  );
}
