import LoadingGif from '../assets/loading.gif';

const Loading = () => {
  return (
    <div className="w-100 h-100 d-flex justify-content-center align-items-center">
      <img src={LoadingGif} alt="loading..." />
    </div>
  );
};

export default Loading;
