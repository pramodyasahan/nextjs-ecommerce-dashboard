import {ReactNode} from 'react';
import {IoCartSharp} from "react-icons/io5";

const PageHeader = ({children}: { children: ReactNode }) => {
    return (
        <h1 className="text-4xl mb-4"><IoCartSharp className="inline-block mb-1.5"/> {children}</h1>
    );
};

export default PageHeader;