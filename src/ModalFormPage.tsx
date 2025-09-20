import ApplicationFormModal from "./components/ApplicationFormModal/ApplicationFormModal";

const ModalFormPage = () => {
  const handleClickButton = async () => {
    const result = await ApplicationFormModal.open();
    if (result) {
      console.log("Form submitted with data:", result);
    } else {
      console.log("Form was cancelled");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        type="button"
        onClick={handleClickButton}
        className="px-6 py-3 text-base font-semibold text-white bg-blue-500 border-none rounded-lg cursor-pointer transition-colors duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        🚀 신청 폼 작성하기
      </button>
    </div>
  );
};

export default ModalFormPage;
