const AboutPage = () => {
  return (
    <div className="container mx-auto mt-7">
      <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
        <div className="max-h-96 md:h-screen">
          <img
            className="w-screen h-screen object-cover object-top"
            src="https://images.pexels.com/photos/270373/pexels-photo-270373.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt=""
          />
        </div>
        <div className="flex bg-gray-100 p-10 text-base font-light leading-relaxed text-gray-800">
          <div className="mb-auto mt-auto max-w-lg">
            <h1 className="font-medium leading-tight text-4xl uppercase">
              Auction App
            </h1>
            <h4 className="font-medium leading-tight text-2xl mb-5">
              Safet Pojskić
            </h4>
            <p className="mb-6">
              An app that offers you buying and selling goods or services by
              offering them up for bids, taking bids, and then selling the item
              to the highest bidder or buying the item from the lowest bidder.
              Participants bid openly against one another, with each subsequent
              bid required to be higher than the previous bid.
            </p>
            <a
              href="mailto:pojskicsafet@gmail.com"
              className="bg-black rounded-md py-3 px-7 text-white"
            >
              Email Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
