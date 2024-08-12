import dynamic from 'next/dynamic'
// Use a separate component so that the page can be loaded on the client side given that we use the window object
const SignInPage = dynamic(() => import('./page'), { ssr: false })
export default function Page() {
  return (<SignInPage />)
}
