import ProgressBar from "@/components/ProgressBar"
import Link from "next/link"
export default function Home() {
  return (
    
    <main className="flex h-[100vh] flex-col items-center gap-5 p-24">
      <h1 className="text-3xl font-bold">Hello lanceme up!</h1>
      <div className="buttons flex gap-3">
        <Link href="/signup" className="bg-blue-500 px-3 py-1 rounded-md text-white">Add Data</Link>
        <Link href="/datapage" className="bg-blue-500 px-3 py-1 rounded-md text-white">All data</Link>
      </div>
      <ProgressBar/>
    </main>
  
  )
}
