const Loader = () => {
  return (
    <div
      className="preloader-wrapper small active"
      style={{ display: 'flex', justifyContent: 'center', paddingTop: '2rem' }}
    >
      <div className="spinner-layer spinner-green-only">
        <div className="circle-clipper left">
          <div className="circle"></div>
        </div>
        <div className="gap-patch">
          <div className="circle"></div>
        </div>
        <div className="circle-clipper right">
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
