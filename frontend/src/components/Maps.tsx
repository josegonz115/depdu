
const sampleMaps = () => {
  const numArray = [1,2,3,4,5];
  return (
    <>
    {numArray.map((item)=> (
      <div className="flex flex-row">
        <p className="text-3xl md:p-8 ">{item}</p>
        <div className="m-3 rounded-xl bg-gray-300 w-full">
          <div className="">place {item}</div>
        </div>
      </div>
    ))}
    </>
  )
}

function Maps () {
  return (
    <>
    <div className="mx-auto w-full h-full"> {/* container */}
      <div className="p-8 grid grid-cols-2 grid-rows-1"> {/* grid that holds places and map */}
        <div className="debug"> {/* recommending places near you */}
          <div className="mt-8 font-inter font-bold grid grid-rows-6 grid-cols-1">
            <div className="flex flex-row">
              <p className="opacity-0 text-3xl md:pl-8 md:pr-8">0</p>
              <p className="m-2 flex items-end ">Places Near You</p>
            </div>

          {sampleMaps()}
            

          </div>
        </div>
        <div className="debug">
        </div>
      </div>
    </div>
    </>
  )
}

export default Maps