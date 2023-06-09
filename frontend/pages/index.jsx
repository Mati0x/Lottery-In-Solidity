import { ConnectButton } from "@rainbow-me/rainbowkit";
import Contract from "../components/Account";
import ReadContract from "../components/ReadContract";
import WriteContract from "../components/WriteContract";
export default function Home() {
  return (
    <>
      <div className="h-screen w-full bg-gradient-to-r from-sky-500 to-indigo-500 ">
        <nav className="p-4 border-black flex justify-end fixed w-full">
          <ConnectButton></ConnectButton>
        </nav>
        <main className="h-full flex items-center justify-center">
          <div className="container mx-auto p-4 border-2 h-[75%] flex flex-col space-y-4">
            <Contract />
            <div className="flex">
              <ReadContract />
              <WriteContract />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
