export function Loading({ dashboard = false, blur = false }): JSX.Element {
    return (
      <>
        <div
          className={`fixed z-50 flex items-center justify-center bg-black 
              ${dashboard ? "h-full w-full" : "h-screen w-screen"} 
              ${blur && "opacity-75"}`}
        >
          <div className="flex items-center justify-center space-x-1 text-xl text-[#0A0A0A]">
            <div className="custom-loader cursor-default select-none"></div>
          </div>
        </div>
      </>
    );
  }
  