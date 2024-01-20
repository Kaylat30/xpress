export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-veryDarkBlue flex flex-col items-center ">
      <div className="text-white">Copyright &copy; {currentYear}, All Rights Reserved</div>
      <div className="text-white">Developed by Kayondo Abdulatif</div>
    </footer>
  )
}
