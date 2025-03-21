'use client'

import { SetStateAction, useState } from "react";
import { useFilter } from "../contexts/context";

interface SidebarProps {
    toggleSidebar: () => void;
    isOpen: boolean
  }

const Sidebar: React.FC<SidebarProps> = ({isOpen, toggleSidebar }) => {
    const { changeFilter } = useFilter();
    const [active, setActive] = useState('Tengrinews');
  
    const handleClick = (filter: string) => {
      changeFilter(filter);
      setActive(filter);
      toggleSidebar();
    };
    
    return (
        <div className={`bg-[#282828] ${isOpen === true ? ' right-0 visible ' : '-right-full invisible'} z-10 w-64 fixed transition-all duration-500 top-20 text-white`}>
            <div className=" min-h-screen flex flex-col justify-between p-5">
                <div>
                    <div className="mb-5">
                        <a onClick={() => handleClick('Tengrinews')} href="#" className={`flex items-center p-2 rounded-md ${active === 'Tengrinews' ? 'bg-gray-800' : 'bg-inherit'} transition-all hover:bg-gray-800`}>
                            <svg className="w-8" viewBox="0 0 39 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.0169 2.925C23.2389 2.32875 21.3754 2.02686 19.5 2.03125C17.2738 2.03125 15.1532 2.44563 13.2032 3.20938C8.7344 4.93188 5.16753 8.42563 3.3394 12.8456V12.8538C2.47187 14.962 2.02739 17.2202 2.03128 19.5C2.03128 28.1369 8.30378 35.3113 16.5344 36.7088H16.5425C17.5094 36.8794 18.4925 36.9688 19.5 36.9688C22.555 36.9688 25.4232 36.1888 27.9175 34.8075H27.9257C30.2332 33.5319 32.2157 31.7606 33.7432 29.6156C35.7744 26.7638 36.9688 23.2781 36.9688 19.5C36.9688 17.3144 36.5625 15.2181 35.8232 13.2925" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M13.1934 3.2045L14.8468 4.51669L18.3138 5.18294L17.754 6.99969L15.7861 7.68056L13.984 10.5877L11.0468 12.4044L6.92903 12.9496L6.83803 14.5844L8.15509 16.0079L8.06409 18.4153L4.40053 15.9169L3.34265 12.8481" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M30.3387 12.3581L31.1675 12.4231L31.915 12.1387H31.9231M33.7431 29.6156L31.9231 28.3806L30.745 25.9837L28.4537 21.9537L28.3806 19.3212L26.6093 18.1919L24.0825 18.0537L19.9225 16.2419L19.2562 12.2363L21.0356 10.3431H22.9287M16.5262 36.7161L19.8737 34.9172L23.0026 34.7051L25.2427 34.1299L27.9231 34.8075M6.85339 19.656L9.83608 16.5986L11.0621 18.7785L15.1953 19.0661L17.1331 22.0033H19.6007L18.9198 25.0762L16.588 27.2716L16.5579 29.0428L14.1204 30.8904L14.196 33.9487L12.1525 33.1914L11.1223 30.2697L11.1678 24.2742L8.06402 23.7136L6.85339 21.3371V19.656Z" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M35.8921 8.84569C35.4144 7.59444 29.8675 3.1655 29.67 3.01763C28.3513 2.03125 27.4145 2.00769 26.3534 2.36681C21.8651 3.88619 20.9007 7.49694 20.8308 7.6765C20.6351 8.17489 20.6449 8.73055 20.8581 9.22171C21.0713 9.71287 21.4706 10.0995 21.9683 10.2968C22.2145 10.3943 22.4688 10.4423 22.7191 10.4423C22.7735 10.4423 22.8247 10.4228 22.8783 10.4179C22.8403 10.7036 22.8635 10.9942 22.9464 11.2704C23.0293 11.5465 23.1701 11.8018 23.3593 12.0193C23.5485 12.2368 23.7819 12.4115 24.0439 12.5318C24.3058 12.6522 24.5904 12.7154 24.8787 12.7173C24.4508 13.3193 24.038 13.9318 23.6405 14.5543C23.4449 14.8612 23.3354 15.215 23.3234 15.5788C23.3115 15.9425 23.3975 16.3027 23.5725 16.6218C23.7475 16.9409 24.005 17.2071 24.3181 17.3926C24.6313 17.578 24.9885 17.6759 25.3524 17.6759C25.6943 17.6763 26.0308 17.5903 26.3306 17.4259C26.6304 17.2616 26.8839 17.0243 27.0676 16.7359C28.7356 14.1172 30.8725 11.5603 32.162 10.5511C32.2465 11.0159 32.205 11.7577 31.6931 12.5279C31.3949 12.9766 31.2871 13.5253 31.3935 14.0535C31.4998 14.5816 31.8116 15.0458 32.2603 15.3441C32.4824 15.4917 32.7315 15.5942 32.9932 15.6456C33.255 15.697 33.5243 15.6964 33.7858 15.6437C34.3139 15.5374 34.7782 15.2256 35.0764 14.7769C36.2813 12.9626 36.5941 10.6901 35.8921 8.84569Z" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M24.8788 12.7172C26.429 10.5576 28.3514 8.983 28.3514 8.983M22.8784 10.4179C23.734 9.074 25.6117 7.77156 25.6117 7.77156" stroke="#F8F8F8" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <span className="ml-2 ">TengriNews</span>
                        </a>
                    </div>
                    <div className="mb-5">
                        <a onClick={() => handleClick('DigitalBusiness')}  href="#" className={`flex items-center p-2 rounded-md ${active === 'DigitalBusiness' ? 'bg-gray-800' : 'bg-inherit'} transition-all hover:bg-gray-800`}>
                            <svg className="w-8 mr-2" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M32.5 5H7.5C6.11929 5 5 6.11929 5 7.5V25.8333C5 27.214 6.11929 28.3333 7.5 28.3333H32.5C33.8807 28.3333 35 27.214 35 25.8333V7.5C35 6.11929 33.8807 5 32.5 5Z" stroke="#F8F8F8" strokeWidth="2" strokeLinejoin="round"/>
                                <path d="M11.6666 35H28.3333M20 28.3333V35" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <span className="ml-2">Digital Business</span>
                        </a>
                    </div>
                    <div className="mb-5">
                        <a onClick={() => handleClick('TengrinewsSport')} href="#" className={`flex items-center p-2 rounded-md ${active === 'TengrinewsSport' ? 'bg-gray-800' : 'bg-inherit'} transition-all hover:bg-gray-800`}>
                        <svg className="w-8 mr-2" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22.5 39.375C31.8198 39.375 39.375 31.8198 39.375 22.5C39.375 13.1802 31.8198 5.625 22.5 5.625C13.1802 5.625 5.625 13.1802 5.625 22.5C5.625 31.8198 13.1802 39.375 22.5 39.375Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                            <path d="M22.5 15.394L15.8124 21.0041M22.5 15.394L29.1876 21.0041M22.5 15.394V10.3342M15.8124 21.0041L17.5781 28.125M15.8124 21.0041L11.1656 19.0354M17.5781 28.125H27.4219M17.5781 28.125L15.1172 32.3438M27.4219 28.125L29.1876 21.0041M27.4219 28.125L29.8828 32.3438L27.4219 38.584M29.1876 21.0041L33.8344 19.0354M33.8344 19.0354L36.1002 12.5965M33.8344 19.0354L39.2871 23.7278M11.1656 19.0354L8.8998 12.5965M11.1656 19.0354L5.71289 23.7278M22.5 10.3342L28.125 6.58653M22.5 10.3342L16.875 6.58565M36.1002 32.3438H30.0586M15.1172 32.3438L17.6106 38.6279M15.1172 32.3438H8.93232" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>

                            <span className="ml-2">Спорт</span>
                        </a>
                    </div>
                    <div className="mb-5">
                        <a onClick={() => handleClick('TengrinewsEdu')} href="#" className={`flex items-center p-2 rounded-md ${active === 'TengrinewsEdu' ? 'bg-gray-800' : 'bg-inherit'} transition-all hover:bg-gray-800`}>
                        <svg className="w-8 mr-2" viewBox="0 0 30 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.1579 16.8198C13.121 15.3678 10.0683 12.8287 1.31589 12.8287V31.009C10.0683 31.009 13.121 33.548 15.1579 35M15.1579 16.8198V35M15.1579 16.8198C17.1949 15.3678 20.2476 12.8287 29 12.8287V31.009C20.2476 31.009 17.1949 33.548 15.1579 35M20.5662 1.14179V7.52746M25.4054 1H7.22252C6.71452 0.999406 6.21647 1.13583 5.78467 1.39385L1 4.26635L5.78467 7.1336C6.21647 7.39163 6.71452 7.52805 7.22252 7.52746H25.4054C25.8578 7.53983 26.3082 7.4646 26.7299 7.30622C27.1517 7.14783 27.5362 6.90951 27.8607 6.60534C28.1852 6.30118 28.4432 5.93734 28.6194 5.53537C28.7955 5.13339 28.8863 4.70143 28.8863 4.26504C28.8863 3.82865 28.7955 3.39669 28.6194 2.99472C28.4432 2.59274 28.1852 2.22891 27.8607 1.92474C27.5362 1.62057 27.1517 1.38225 26.7299 1.22387C26.3082 1.06548 25.8578 0.987626 25.4054 1Z" stroke="#F8F8F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>

                            <span className="ml-2">Образование</span>
                        </a>
                    </div>
                    {/* <div className="text-left mt-5">
                        <p className="text-gray-400">Войдите, ставить лайки видео и читать комментарии.</p>
                        <button className="mt-5 transition-all bg-[#213a39] text-white px-4 py-2 rounded hover:bg-[#1e2e2d]">Войти</button>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Sidebar;