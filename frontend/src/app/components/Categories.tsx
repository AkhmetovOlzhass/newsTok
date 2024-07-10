const Categories = () => {
    return(
        <ul className="text-[#f1f3f4] flex gap-2 mx-auto mt-4 ">
            <li className="rounded-[28px] border-[1px] border-[#3c4043] py-2 px-4 bg-[#1f1f1f] cursor-pointer text-lg hover:bg-[#2c303d] ">Tengri</li>
            <li className="rounded-[28px] border-[1px] border-[#3c4043] py-2 px-4 bg-[#1f1f1f] cursor-pointer text-lg hover:bg-[#2c303d] ">DigitalBuisness</li>
            <li className="rounded-[28px] border-[1px] border-[#3c4043] py-2 px-4 bg-[#1f1f1f] cursor-pointer text-lg hover:bg-[#2c303d] ">Sport</li>
        </ul>
    )
}

export default Categories;