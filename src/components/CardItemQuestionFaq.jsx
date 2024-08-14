import { Button } from "./ui/button";

/*
  PROPS

  1. faq: object faq yang akan ditampilkan
  2. handleFaqButton: function untuk handle onClick item button FAQ, untuk trigger button
*/
export function CardItemQuestionFaq({ faq, handleFaqButton }) {
  function handleOnClickButton(faq) {
    handleFaqButton(faq);
  }
  return (
    <div className="my-2">
      <Button
        key={faq.id}
        onClick={() =>
          handleOnClickButton({
            id: faq.id,
            question: faq.question,
          })
        }
      >
        <h1 className="font-bold">{faq.question}</h1>
      </Button>
    </div>
  );
}
