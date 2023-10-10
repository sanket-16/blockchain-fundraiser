import React from 'react'

const profile = () => {
  return (
    <div className="max-w-6xl mx-5 p-10 xl:mx-auto">
      <div className="grid grid-cols-2 gap-1">
        <div className="w-full flex justify-center">
          <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJapEe9b-WgzEDHpQSp6SCrdVHS32o35c_2g&usqp=CAU" alt="pfp" className="block rounded-full h-36 w-36" />
          </div>
        </div>
        <div className="cols-span-2 pt-5 grid grid-cols-3 text-center">
          <span className="text-3xl">7</span>
          <span className="text-3xl">6</span>
          <span className="text-3xl">7</span>
          <div>Contributions</div>
          <div>Wishlist</div>
          <div>Campaigns</div>
        </div>
        <div className='flex items-center flex-col pt-4'>
          <div>
            <p className="font-bold text-lg">Account ID : 5677</p>
            <p className="pt-2">Balance : 9,000</p>
          </div>
        </div>
      </div>
      <hr className="border-[1px] mt-9 " />
      <div className="flex justify-center gap-20">
        <button className="focus:border-t border-gray-800 py-4 text-lg font-semibold text-gray-500 focus:text-gray-700">Transactions</button>
        <button className="focus:border-t border-gray-800 py-4 text-lg font-semibold text-gray-500 focus:text-gray-700">Wishlist</button>
        <button className="focus:border-t border-gray-800 py-4 text-lg font-semibold text-gray-500 focus:text-gray-700">My Campaign</button>
      </div>

    </div>
  )
}

export default profile

