import { Button } from "./ui/button";

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
