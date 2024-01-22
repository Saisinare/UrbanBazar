import axios from "axios";
import jsCookie from "js-cookie";
import React from "react";

const Modal = (props) => {
  const hadleClick = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API_URL}/api/user?token=${jsCookie.get("token")}`,
        {},
        { withCredentials: true }
      );
      if (response) {
        console.log(response);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="policy-box-bg h-screen w-screen bg-gray-100/50 top-0 absolute backdrop-blur-sm left-0  flex items-center p-5  justify-center z-50 mt-screen">
      <div className="modalbox h-full w-8/12 bg-white rounded-lg">
        <div className="title h-1/6 w-full flex  justify-center items-center font-bold">
          Our Policies
        </div>
        <div className="text-sm p-8 font-semibold main overflow-y-scroll h-4/6 w-full text-slate-600 ">
          <p>
            Thank you for your interest in becoming a seller on UrbanBazar! We
            are excited to have you join our platform. To ensure a fair and
            transparent selling experience, we have outlined our seller
            registration and policies below:
          </p>

          <p>1. Eligibility:</p>
          <p>
            To become a seller, you must be at least [age] years old and possess
            the legal capacity to enter into contracts.
          </p>

          <p>2. Account Creation:</p>
          <p>
            To start the seller registration process, you must create an account
            on our platform.
            <br />
            All information provided during the registration process must be
            accurate and up-to-date.
          </p>

          <p>3. Product Listings:</p>
          <p>
            Sellers are responsible for creating accurate and detailed product
            listings. Listings should include clear images, accurate
            descriptions, and relevant attributes.
            <br />
            Listings should not violate any copyright, trademark, or
            intellectual property rights.
          </p>

          <p>4. Product Availability:</p>
          <p>
            Sellers must ensure that the products listed are in stock and
            available for purchase. Products that are out of stock should be
            promptly marked as unavailable.
          </p>

          <p>5. Pricing:</p>
          <p>
            Sellers have the freedom to set their own prices for their products
            within our guidelines.
            <br />
            Prices must be listed in [Currency] and should be transparent,
            without hidden fees.
          </p>

          <p>6. Shipping:</p>
          <p>
            Sellers are responsible for providing accurate shipping information,
            including shipping methods, costs, and estimated delivery times.
            <br />
            Any delays or issues related to shipping are the seller's
            responsibility to address.
          </p>

          <p>7. Customer Service:</p>
          <p>
            Sellers are expected to provide excellent customer service and
            promptly respond to customer inquiries, concerns, and requests.
            <br />
            Any communication with customers should be professional and
            respectful.
          </p>

          <p>8. Product Quality:</p>
          <p>
            Sellers are responsible for ensuring the quality and authenticity of
            the products they list.
            <br />
            Counterfeit or substandard products are strictly prohibited.
          </p>

          <p>9. Returns and Refunds:</p>
          <p>
            Sellers must adhere to the platform's return and refund policies.
            <br />
            Sellers are responsible for handling return requests and providing
            refunds when applicable.
          </p>

          <p>10. Compliance:</p>
          <p>
            Sellers must comply with all applicable laws, regulations, and
            industry standards.
          </p>

          <p>11. Commission and Fees:</p>
          <p>
            Sellers may be subject to commission fees or subscription charges
            based on the chosen selling plan. These fees will be outlined during
            the registration process.
          </p>

          <p>12. Account Termination:</p>
          <p>
            UrbanBazar reserves the right to terminate a seller's account for
            any violation of our policies or for behavior that negatively
            impacts the customer experience.
          </p>

          <p>13. Intellectual Property:</p>
          <p>
            Sellers grant UrbanBazar a limited license to use product images and
            content for promotional purposes related to the platform.
          </p>

          <p>14. Updates to Policies:</p>
          <p>
            Seller policies may be updated from time to time. It is the seller's
            responsibility to stay informed about any changes.
          </p>

          <p>
            By registering as a seller on UrbanBazar, you agree to abide by
            these policies and guidelines. We are excited to have you as a part
            of our community and look forward to your contributions!
          </p>
        </div>
        <div className="main h-1/6 w-full p-5 flex justify-end">
          <button
            type="button"
            className="text-red-600  font-sans font-bold px-10   text-center  transition-all duration-500 ease-in-out rounded-lg text-md border-2 mx-2 hover:border-red-400"
            onClick={() => {
              props.setmodal(false);
            }}
          >
            Decline
          </button>
          <button
            type="button"
            className="text-gray-600 bg-green-500 font-sans font-bold px-10 text-center  transition-all duration-500 ease-in-out rounded-lg text-md hover:bg-green-700 "
            onClick={hadleClick}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};
export default Modal;
