/*
  PROPS

  1. fullname: userEnum.CLIENT ("Anda") atau userEnum.ASSISTANT ("Telkom Indonesia")
  2. message: pesan yang akan ditampilkan
  3. bgColor: warna background bubble chat (pembeda antara userEnum.CLIENT dan userEnum.ASSISTANT)
*/

export function BubbleChat({ fullname, message, bgColor }) {
  return (
    <>
      <div>{fullname}</div>
      <div className={`${bgColor} p-4 rounded-md`}>
        <p>{message}</p>
      </div>
    </>
  );
}
