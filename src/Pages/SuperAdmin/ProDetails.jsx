import React, { useEffect } from "react";
import { IoIosStar } from "react-icons/io";
import { IoLocationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaRegCalendarAlt } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import provider from "../../assets/img/provider.png";
import service1 from "../../assets/img/service1.png";
import service2 from "../../assets/img/service2.png";
import service3 from "../../assets/img/service3.png";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary, {
  accordionSummaryClasses,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import random1 from "../../assets/img/random1.png";
import random2 from "../../assets/img/random2.png";
import random3 from "../../assets/img/random3.png";
import reviewuser from "../../assets/img/reviewuser.png";
import { Modal } from "@mui/material";
import { FiPhone } from "react-icons/fi";
import { BiMessageAltDetail, BiMessageSquareDetail } from "react-icons/bi";
import { TbMailDown } from "react-icons/tb";
import { PiChats } from "react-icons/pi";
import Facebook from "../../assets/img/Facebook-icon.png";
import Youtube from "../../assets/img/Youtube-icon.png";
import Twitter from "../../assets/img/Twitter-icon.png";
import Instagram from "../../assets/img/Instagram-icon.png";
import Linkdin from "../../assets/img/Linkdin-icon.png";
import Business from "../../assets/img/Business-icon.png";
import Review from "../../Components/SuperAdmin/Review";
import TotalReviews from "../../Components/SuperAdmin/TotalReviews";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `none`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "transparent",
  border: "none",
  flexDirection: "row-reverse",
  [`& .${accordionSummaryClasses.expandIconWrapper}.${accordionSummaryClasses.expanded}`]:
    {
      transform: "rotate(90deg)",
    },
  [`& .${accordionSummaryClasses.content}`]: {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
    border: "none",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  border: "none",
}));

function ServiceBox({ image, title, price, description, tags }) {
  return (
    <Link to="#" className="border px-3 py-3 rounded-lg">
      <img src={image} alt={title} className="rounded-lg w-full" />
      <div className="flex justify-between items-center mt-5">
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="mb-0 text-2xl font-bold">${price}</p>
      </div>
      <p className="text-sm">{description}</p>
      <div className="flex mt-7">
        {tags.map((tag, index) => (
          <p
            key={index}
            className={`px-3 py-1 font-semibold text-sm rounded-full me-2 ${
              tag.type === "primary"
                ? "text-[#0F91D2] bg-[#E7F4FB]"
                : "text-[#343434] bg-[#EBEBEB]"
            }`}
          >
            {tag.label}
          </p>
        ))}
      </div>
    </Link>
  );
}

function ProDetails() {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  useEffect(() => {
    document.title = "Profile Details";
  }, []);

  const services = [
    {
      image: service1,
      title: "Service 1",
      price: 50,
      description: "This is a description for Service 1.",
      tags: [
        { label: "Primary", type: "primary" },
        { label: "Secondary", type: "secondary" },
      ],
    },
    {
      image: service2,
      title: "Service 2",
      price: 75,
      description: "This is a description for Service 2.",
      tags: [
        { label: "New", type: "primary" },
        { label: "Popular", type: "secondary" },
      ],
    },
    {
      image: service3,
      title: "Service 3",
      price: 100,
      description: "This is a description for Service 3.",
      tags: [
        { label: "Featured", type: "primary" },
        { label: "Limited", type: "secondary" },
      ],
    },
  ];

  const categories = ["Category 01", "Category 02", "Category 03"];

  const accordionData = [
    {
      title: "Technician Photos",
      images: [random1, random2, random3],
    },
    {
      title: "Vehicle Photos",
      images: [random1, random2, random3],
    },
    {
      title: "Facility Photos",
      images: [random1, random2, random3],
    },
    {
      title: "Project Photos",
      images: [random1, random2, random3],
    },
    {
      title: "Licences",
      images: [random1, random2, random3],
    },
    {
      title: "Awards",
      images: [random1, random2, random3],
    },
    {
      title: "Insurance",
      images: [random1, random2, random3],
    },
  ];

  const reviews = [
    {
      name: "Patricia Sanders",
      userimg: [reviewuser],
      title: "Service Title",
      date: "Jan 20, 2024",
      rating: 5,
      review:
        "Sed mollis porttitor mauris eu egestas. Sed vel augue non massa maximus suscipit. Nulla a pharetra leo, eget cursus diam. Phasellus ultrices in urna in faucibus. Aliquam vulputate enim finibus condimentum tincidunt.",
    },
    {
      name: "Katie Sims",
      userimg: [reviewuser],
      title: "Service Title",
      date: "Jan 20, 2024",
      rating: 5,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis accumsan turpis. Phasellus tincidunt neque sed nunc mattis molestie. Praesent auctor metus sit amet elit finibus, ac sodales enim egestas.",
    },
  ];

  const starCounts = [
    { stars: 5, count: 488 },
    { stars: 4, count: 74 },
    { stars: 3, count: 14 },
    { stars: 2, count: 0 },
    { stars: 1, count: 0 },
  ];

  const [contactopen, setcontactOpen] = React.useState(false);
  const handlecontactOpen = () => setcontactOpen(true);
  const handlecontactClose = () => setcontactOpen(false);

  const modalContacts = [
    { path: "#", Icon: <FiPhone />, title: "Call Pro: (785) 712-6532" },
    {
      path: "#",
      Icon: <BiMessageSquareDetail />,
      title: "Text Pro: (708) 813-8989",
    },
    {
      path: "#",
      Icon: <BiMessageAltDetail />,
      title: "Instant Chat",
    },
    { path: "#", Icon: <TbMailDown />, title: "Email Pro" },
    { path: "#", Icon: <PiChats />, title: "Direct Form" },
    {
      path: "#",
      Icon: <IoLocationOutline />,
      title: "Get Directions",
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      avatar: Facebook,
      link: "#",
    },
    {
      name: "Twitter",
      avatar: Twitter,
      link: "#",
    },
    {
      name: "Instagram",
      avatar: Instagram,
      link: "#",
    },
    {
      name: "LinkedIn",
      avatar: Linkdin,
      link: "#",
    },
    {
      name: "YouTube",
      avatar: Youtube,
      link: "#",
    },
    {
      name: "Google Business",
      avatar: Business,
      link: "#",
    },
  ];

  const SpecialHours = [
    { day: "Monday", time: "9AM - 5PM" },
    { day: "Tuesday", time: "9AM - 5PM" },
    { day: "Wednesday", time: "9AM - 5PM" },
    { day: "Thursday", time: "9AM - 5PM" },
    { day: "Friday", time: "9AM - 5PM" },
    { day: "Saturday", time: "10AM - 4PM" },
    { day: "Sunday", time: "Closed" },
  ];

  return (
    <div>
      <div className="flex items-center">
        <Link to="#">
          <FaArrowLeft className="me-4 text-xl" />
        </Link>
        <h2 className="text-2xl font-semibold">Profile Details</h2>
      </div>
      <div className="flex flex-col lg:flex-row justify-between mt-4 lg:items-start">
        <div className="flex flex-wrap items-center">
          <img
            src={provider}
            alt=""
            className="me-2 my-2 rounded-lg max-w-[120px]"
          />
          <div className="my-2">
            <div className="flex">
              <p className="font-semibold myhead me-2">Provider Name</p>
              <div className="flex">
                <IoIosStar className="me-2 text-[#F8C600]" />
                <p className="myblack text-sm">
                  <span className="myhead font-semibold">4.9</span>(457)
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-2">
              <p className="myblack pe-3 me-3 border-e">House Cleaning</p>
              <div className="flex items-center">
                <IoLocationOutline className="me-2 myblack" />
                <p className="myblack ">Address of the provider here</p>
              </div>
            </div>
            <div className="flex mt-2">
              <div className="flex me-2">
                <FaRegCalendarAlt className="me-2" />
                <p className="text-sm myblack">Hours:&nbsp;</p>
                <p className="text-sm text-[#34A853]">Available</p>
              </div>
              <p className="text-sm myblack">Close 6PM</p>
            </div>
          </div>
        </div>
        <button
          onClick={handlecontactOpen}
          className="flex mt-3 lg:mt-0 py-3 justify-center items-center px-6 font-semibold rounded-lg text-[#fff] bg-[#FB8803] w-full lg:max-w-[300px] lg:fixed right-[20px] z-[99]"
        >
          <IoChatbubbleEllipsesOutline className="me-2 text-[#fff] text-xl" />
          <span>Contact Pro</span>
        </button>
        <Modal
          open={contactopen}
          onClose={handlecontactClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{ m: 2 }}
        >
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[400px] outline-none">
            <div className="bg-white rounded-[12px] p-4 max-h-[calc(100dvh-200px)] overflow-y-auto scroll-x-hidden">
              <p className="text-lg font-semibold">Contact Pro</p>
              <div className="flex flex-col gap-3 mt-4">
                {modalContacts.map((contact, index) => (
                  <Link
                    key={index}
                    className="bg-[#FB8803] text-white flex items-center justify-center gap-2 p-3 rounded-[8px] text-sm font-medium"
                    to={contact.path}
                  >
                    <span className="text-[24px]">{contact.Icon}</span>
                    <span>{contact.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-medium myhead">About Me</h2>
        <p className="myblack mt-3">
          Donec pulvinar consequat metus eget cursus. Donec nec quam eu arcu
          elementum tempor eu pharetra mauris. Morbi et gravida purus, nec
          sagittis risus. Nulla placerat justo ut dui aliquam efficitur. Mauris
          aliquet mattis odio nec malesuada. Morbi at dui tristique, dignissim
          enim ac, varius nulla. Donec venenatis libero nec ligula laoreet
          laoreet. Sed quis lorem in mi suscipit dictum id nec diam. Orci varius
          natoque penatibus et magnis dis parturient montes, nascetur ridiculus
          mus. Nam at vehicula neque. Proin molestie venenatis sem, ut imperdiet
          leo efficitur vel. Vestibulum nec elementum lacus.
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-lg font-medium myhead">
          Secondary Business Categories
        </h2>
        <div className="flex flex-wrap">
          {categories.map((pill, index) => (
            <p
              key={index}
              className="px-3 my-1 py-1 font-medium text-sm rounded-full me-2 text-[#343434] bg-[#EBEBEB]"
            >
              {pill}
            </p>
          ))}
        </div>
      </div>
      {/* ----------deal-boxes------ */}
      <div className="mt-4">
        <div className="md:flex justify-between items-center">
          <h2 className="text-lg font-medium myhead">My Deals</h2>
          <div className="flex border rounded-lg items-center px-2">
            <label htmlFor="search">
              <CiSearch className="me-2 text-xl" />
            </label>
            <input
              id="search"
              type="search"
              className="py-2 w-full focus:outline-none"
              placeholder="Search"
            />
          </div>
        </div>
        <div className="grid mt-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <ServiceBox
              key={index}
              image={service.image}
              title={service.title}
              price={service.price}
              description={service.description}
              tags={service.tags}
            />
          ))}
        </div>
      </div>
      {/* ----------photos accordian------ */}
      <div className="additional">
        <h2 className="text-lg mt-4 font-medium myhead">Additional Photos</h2>
        <div>
          {accordionData.map((data, index) => {
            const panelId = `panel${index + 1}`;
            return (
              <Accordion
                key={panelId}
                expanded={expanded === panelId}
                onChange={handleChange(panelId)}
              >
                <AccordionSummary
                  aria-controls={`${panelId}d-content`}
                  id={`${panelId}d-header`}
                >
                  <h3>{data.title}</h3>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                    {data.images.map((image, i) => (
                      <div className="my-2 md:my-0" key={i}>
                        <img
                          src={image}
                          alt={`Accordion ${index + 1} - Image ${i + 1}`}
                          className="w-full rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })}
          <Accordion
            expanded={expanded === "SpecialHour"}
            onChange={handleChange("SpecialHour")}
          >
            <AccordionSummary
              aria-controls={`SpecialHourd-content`}
              id={`SpecialHourd-header`}
            >
              <h3>Special Hours of Operation</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {SpecialHours.map((row, index) => (
                  <div key={index} className="py-5 border-b border-[#E9EAEB]">
                    <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
                      <div className="flex gap-3 items-center">
                        <div>
                          <p className="font-medium text-[#343434]">
                            {row.day}
                          </p>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <p>{row.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "Socials"}
            onChange={handleChange("Socials")}
          >
            <AccordionSummary
              aria-controls={`Socialsd-content`}
              id={`Socialsd-header`}
            >
              <h3>Socials</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div>
                {socialLinks.map((social, index) => (
                  <div key={index} className="py-5 border-b border-[#E9EAEB]">
                    <div className="flex items-center flex-wrap gap-3 justify-between py-3 px-4 bg-[#FAFAFA] min-h-[60px] rounded-[8px]">
                      <div className="flex gap-3 items-center">
                        <img
                          className="size-6 max-w-6 object-contain"
                          src={social.avatar}
                          alt=""
                        />
                        <div>
                          <p className="font-medium text-[#343434]">
                            {social.name}
                          </p>
                        </div>
                      </div>
                      <div className="ms-auto">
                        <Link
                          to={social.link}
                          className="text-white text-sm font-semibold bg-[#0F91D2] border border-[#0F91D2] rounded-[8px] shadow-[0px_1px_2px_0px_#0A0D120D] py-3 px-4"
                        >
                          Visit
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
      {/* --------reviews--------- */}
      <div className="mt-5">
        <div>
          <TotalReviews data={starCounts} />
        </div>
        <div className="mt-8">
          <Review data={reviews} />
        </div>
      </div>
    </div>
  );
}

export default ProDetails;
