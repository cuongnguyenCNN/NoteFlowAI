export default function NoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {" "}
      <div className="transition-all w-full h-full  flex flex-col  duration-400 pl-[272px] max-[866px]:pl-0 max-tablet:pl-0">
        <div className="flex w-full flex-col px-8 max-[600px]:px-4 !flex-row pl-0">
          <div className="w-full ml-8 max-[600px]:ml-0 h-auto">
            <div className="flex flex-col  space-y-3  pt-5 ">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
