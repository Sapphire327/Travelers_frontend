'use client'
import styles from './layout.module.css'
import Link from "next/link";
import clsx from "clsx";
import WithAuthHoc from "@/store/auth/withAuthHOC";
import {usePathname} from "next/navigation";
const root = function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
    const pathname = usePathname();
    return (
        <WithAuthHoc>
            <div className={clsx(styles.content,'container')}>
                <ul className={styles.panel}>
                    <li><Link className={clsx('link', styles.panel__button,pathname.indexOf('/admin/applications')!=-1&&'active')} href='/admin/applications'>Заявки</Link>
                    </li>
                    <li><Link className={clsx('link', styles.panel__button,pathname.indexOf('/admin/tours')!=-1&&'active')} href='/admin/tours'>Туры</Link></li>
                    <li><Link className={clsx('link', styles.panel__button,pathname.indexOf('/admin/places')!=-1&&'active')} href='/admin/places'>Места</Link></li>
                </ul>
                <div className={styles.childrens}>
                    {children}
                </div>
            </div>
        </WithAuthHoc>

    );
}
export default root