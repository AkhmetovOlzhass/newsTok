'use client'

import Image from 'next/image';
import { useState } from 'react';
import BurgerMenu from './BurgerMenu';
import Sidebar from './Sidebar';
import SidebarMobile from './SidebarMobile';

const Header = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        
      setIsSidebarOpen(!isSidebarOpen);
    };
    
    return(
        <>
            <header className="flex sticky top-0 z-20 justify-center border-b-[1px] border-b-[#ffffff12] bg-[#282828]  ">
            <div className='w-full'>
                <div className="flex items-center justify-between py-2 px-4">
                    <svg viewBox="0 0 132 35" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_7_12)">
                        <g clipPath="url(#clip1_7_12)">
                        <g clipPath="url(#clip2_7_12)">
                        <g clipPath="url(#clip3_7_12)">
                        <g clipPath="url(#clip4_7_12)">
                        <g clipPath="url(#clip5_7_12)">
                        <path d="M131.763 0.0834656H0.237183V34.5666H131.763V0.0834656Z" />
                        <g clipPath="url(#clip6_7_12)">
                        <path d="M21.4951 26.3894H18.514L17.1659 24.3116L12.5257 18.1042H9.46676V16.1562H12.2405L17.1919 9.92277L18.2806 8.20858H21.1581L14.3922 16.7536L21.4951 26.3894ZM10.8148 26.3894H8.09283L8.35207 24.3116V10.2864L8.09283 8.20858H10.8148L10.5555 10.2864V24.3116L10.8148 26.3894ZM34.69 26.3894H32.6421L32.2532 25.0129V17.9483C32.2532 17.2557 32.1582 16.6705 31.9681 16.1926C31.778 15.7181 31.4064 15.3511 30.8534 15.0913C30.3004 14.8316 29.4795 14.7017 28.3907 14.7017C27.7512 14.7017 27.1585 14.7623 26.6124 14.8836C26.0697 15.0048 25.5478 15.2299 25.0466 15.5588L24.6318 15.2991V13.4291C25.3922 13.1867 26.1043 13.0256 26.7679 12.946C27.435 12.8698 28.0537 12.8317 28.624 12.8317C30.1275 12.8317 31.2975 13.0308 32.134 13.4291C32.9739 13.8273 33.5667 14.4108 33.9123 15.1796C34.258 15.9519 34.4308 16.9008 34.4308 18.0262V24.3116L34.69 26.3894ZM28.2611 26.7011C27.5007 26.7011 26.7489 26.5747 26.0058 26.3219C25.2626 26.0726 24.6439 25.6397 24.1497 25.0233C23.6588 24.4103 23.4134 23.5671 23.4134 22.4935C23.4134 21.6624 23.569 20.9698 23.8801 20.4157C24.1911 19.8616 24.6094 19.4288 25.1347 19.1171C25.6636 18.8054 26.2563 18.5838 26.9131 18.4522C27.5698 18.3241 28.2438 18.26 28.9351 18.26C29.3498 18.26 29.7335 18.2773 30.0861 18.3119C30.4421 18.3466 30.7929 18.4072 31.1385 18.4937L32.4865 19.4547V20.6495C32.0372 20.4071 31.5568 20.2374 31.0452 20.1404C30.5371 20.0469 29.9547 20.0002 29.298 20.0002C28.0882 20.0002 27.1671 20.1768 26.5346 20.53C25.9055 20.8867 25.591 21.5499 25.591 22.5195C25.591 23.316 25.8243 23.9082 26.2909 24.296C26.7575 24.6874 27.5093 24.883 28.5462 24.883C29.6177 24.883 30.468 24.7099 31.0971 24.3636C31.7296 24.0173 32.2187 23.6017 32.5643 23.1169L33.0828 24.2856L30.5942 26.3894C30.2485 26.476 29.8769 26.5505 29.4795 26.6128C29.082 26.6717 28.6758 26.7011 28.2611 26.7011ZM47.2835 26.3894H37.1735V24.6752L43.8098 15.8965L44.743 15.1692V15.0134H39.2473L37.3808 15.1433V13.1434H47.2057V14.8576L40.5694 23.6883L39.6362 24.3116V24.4675H45.4222L47.2835 24.3376V26.3894ZM57.8602 26.3894H55.6308L49.0463 8.20858H51.6386L52.0015 9.71499L56.2011 21.9741L56.6158 24.2077H56.8751L57.2898 21.9741L61.4894 9.71499L61.8523 8.20858H64.4446L57.8602 26.3894ZM69.8367 10.9617C69.4219 10.9617 69.0676 10.8266 68.7738 10.5565C68.48 10.2899 68.3331 9.92277 68.3331 9.45527C68.3331 8.98776 68.48 8.61895 68.7738 8.34883C69.0676 8.08218 69.4219 7.94885 69.8367 7.94885C70.2514 7.94885 70.6057 8.08218 70.8995 8.34883C71.1933 8.61895 71.3402 8.98776 71.3402 9.45527C71.3402 9.92277 71.1933 10.2899 70.8995 10.5565C70.6057 10.8266 70.2514 10.9617 69.8367 10.9617ZM71.5994 26.3894H68.9034L69.1627 24.3116V14.9095H66.4667V13.1434H71.5994L71.3402 15.2212V24.3116L71.5994 26.3894ZM84.3536 13.4551V15.429L83.9389 15.6887C83.455 15.377 82.9192 15.1346 82.3316 14.9615C81.744 14.7883 81.07 14.7017 80.3096 14.7017C79.7912 14.7017 79.3194 14.7485 78.8942 14.842C78.4725 14.939 78.1355 15.1035 77.8832 15.3355C77.6344 15.571 77.5099 15.8965 77.5099 16.312C77.5099 16.8142 77.6914 17.2124 78.0543 17.5068C78.4172 17.8011 78.8873 18.0522 79.4645 18.26C80.0452 18.4678 80.6553 18.6756 81.2947 18.8833C81.9342 19.0911 82.5425 19.3508 83.1197 19.6625C83.7004 19.9742 84.1722 20.3898 84.5351 20.9092C84.898 21.4287 85.0795 22.1039 85.0795 22.9351C85.0795 23.922 84.8237 24.6874 84.3122 25.2311C83.8041 25.7782 83.1353 26.1591 82.3057 26.3739C81.4762 26.592 80.5948 26.7011 79.6615 26.7011C78.711 26.7011 77.8729 26.6232 77.147 26.4674C76.4212 26.3115 75.799 26.147 75.2805 25.9739V24.0519L75.6953 23.7922C76.2483 24.1212 76.8446 24.3757 77.484 24.5558C78.1234 24.7393 78.9098 24.8311 79.843 24.8311C80.3788 24.8311 80.8799 24.7878 81.3466 24.7012C81.8132 24.6146 82.1968 24.4415 82.4975 24.1818C82.8017 23.922 82.9538 23.5411 82.9538 23.039C82.9538 22.4676 82.7723 22.0174 82.4094 21.6884C82.0465 21.3594 81.5747 21.091 80.994 20.8832C80.4168 20.6755 79.8033 20.4763 79.1535 20.2859C78.5071 20.0954 77.8936 19.8564 77.3129 19.569C76.7357 19.285 76.2656 18.892 75.9027 18.3899C75.5398 17.8877 75.3583 17.2297 75.3583 16.4159C75.3583 15.6714 75.5087 15.0654 75.8094 14.5979C76.1135 14.1303 76.5197 13.7667 77.0278 13.507C77.5393 13.2473 78.101 13.0689 78.7128 12.972C79.328 12.8785 79.9467 12.8317 80.5689 12.8317C81.3293 12.8317 82.024 12.8871 82.6531 12.9979C83.2856 13.1122 83.8525 13.2646 84.3536 13.4551ZM91.0418 10.9617C90.6271 10.9617 90.2728 10.8266 89.979 10.5565C89.6852 10.2899 89.5383 9.92277 89.5383 9.45527C89.5383 8.98776 89.6852 8.61895 89.979 8.34883C90.2728 8.08218 90.6271 7.94885 91.0418 7.94885C91.4566 7.94885 91.8109 8.08218 92.1047 8.34883C92.3985 8.61895 92.5454 8.98776 92.5454 9.45527C92.5454 9.92277 92.3985 10.2899 92.1047 10.5565C91.8109 10.8266 91.4566 10.9617 91.0418 10.9617ZM92.8046 26.3894H90.1086L90.3678 24.3116V14.9095H87.6718V13.1434H92.8046L92.5454 15.2212V24.3116L92.8046 26.3894ZM102.624 26.7011C101.587 26.7011 100.594 26.476 99.6431 26.0258C98.6926 25.5756 97.9201 24.8397 97.3256 23.8181C96.7276 22.7966 96.4287 21.446 96.4287 19.7664C96.4287 18.4851 96.6015 17.4029 96.9471 16.5198C97.2928 15.6368 97.7594 14.9216 98.347 14.3745C98.9346 13.8308 99.5999 13.4377 100.343 13.1953C101.086 12.9529 101.847 12.8317 102.624 12.8317C103.402 12.8317 104.162 12.9529 104.906 13.1953C105.649 13.4377 106.314 13.8308 106.902 14.3745C107.489 14.9216 107.956 15.6368 108.301 16.5198C108.647 17.4029 108.82 18.4851 108.82 19.7664C108.82 21.446 108.523 22.7966 107.928 23.8181C107.33 24.8397 106.561 25.5756 105.621 26.0258C104.677 26.476 103.679 26.7011 102.624 26.7011ZM102.624 24.8311C103.851 24.8311 104.819 24.4501 105.528 23.6883C106.236 22.9264 106.591 21.6018 106.591 19.7145C106.591 18.4505 106.432 17.4548 106.114 16.7276C105.792 16.0004 105.338 15.4809 104.75 15.1692C104.162 14.8576 103.454 14.7017 102.624 14.7017C101.795 14.7017 101.086 14.8576 100.499 15.1692C99.911 15.4809 99.4582 16.0004 99.1402 16.7276C98.8188 17.4548 98.6581 18.4505 98.6581 19.7145C98.6581 21.6018 99.0123 22.9264 99.7209 23.6883C100.429 24.4501 101.397 24.8311 102.624 24.8311ZM123.907 26.3894H121.211L121.47 24.3116V17.6886C121.47 16.7363 121.203 16.0177 120.667 15.5329C120.131 15.048 119.336 14.8056 118.282 14.8056C117.452 14.8056 116.744 14.9268 116.156 15.1692C115.569 15.4117 115.09 15.6835 114.72 15.9848C114.347 16.2895 114.065 16.5458 113.875 16.7536V15.2472L116.675 13.1174C117.02 13.0308 117.375 12.9616 117.738 12.9096C118.1 12.8577 118.472 12.8317 118.852 12.8317C119.682 12.8317 120.459 12.9737 121.185 13.2577C121.911 13.5451 122.504 14.0351 122.964 14.7277C123.42 15.4203 123.648 16.3813 123.648 17.6107V24.3116L123.907 26.3894ZM114.886 26.3894H112.19L112.449 24.3116V15.1692L112.19 13.1434H114.264L114.627 14.6758V24.3116L114.886 26.3894Z" fill="white"/>
                        </g>
                        </g>
                        </g>
                        </g>
                        </g>
                        </g>
                        </g>
                        <defs>
                        <clipPath id="clip0_7_12">
                        <rect width="132" height="34.65" fill="white"/>
                        </clipPath>
                        <clipPath id="clip1_7_12">
                        <rect width="131.526" height="34.4831" fill="white" transform="translate(0.237183 0.0834656)"/>
                        </clipPath>
                        <clipPath id="clip2_7_12">
                        <rect width="131.526" height="34.4831" fill="white" transform="translate(0.237183 0.0834656)"/>
                        </clipPath>
                        <clipPath id="clip3_7_12">
                        <rect width="131.526" height="34.4831" fill="white" transform="translate(0.237183 0.0834656)"/>
                        </clipPath>
                        <clipPath id="clip4_7_12">
                        <rect width="131.526" height="34.4831" fill="white" transform="translate(0.237183 0.0834656)"/>
                        </clipPath>
                        <clipPath id="clip5_7_12">
                        <rect width="131.526" height="34.4831" fill="white" transform="translate(0.237183 0.0834656)"/>
                        </clipPath>
                        <clipPath id="clip6_7_12">
                        <rect width="115.825" height="18.7523" fill="white" transform="translate(8.08765 7.94888)"/>
                        </clipPath>
                        </defs>
                    </svg>

                    <BurgerMenu onClick={toggleSidebar} />
                </div>
            </div>
            
            <SidebarMobile isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        </header>

        <div className={`${isSidebarOpen ? 'absolute w-full h-full z-10 bg-black opacity-45' : ''} transition-all duration-500`} onClick={toggleSidebar}></div>
        </>
    )
}

export default Header;