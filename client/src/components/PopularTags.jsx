import { useNavigate } from "react-router-dom";
import { setSearch } from "../redux/authSlice";
import { useDispatch } from "react-redux";

const PopularTags = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const categories = [
    {
      id: "646c954d0053b184c58edec6",
      name: "Rodent",
    },
    {
      id: "646b40162ce0bb21a57968fa",
      name: "Cockroach",
    },
    {
      id: "646c95090053b184c58edebe",
      name: "Mosquito",
    },
    {
      id: "646c95240053b184c58edec0",
      name: "Termite",
    },
  ];

  const searchCategory = ({ category, name }) => {
    dispatch(
      setSearch({
        title: "",
        category: category,
        name: name,
      })
    );
    navigate(`/all-blogs`);
  };

  return (
    <div>
      {categories?.map((category) => (
        <button
          key={category.id}
          onClick={() =>
            searchCategory({
              category: category.id,
              name: category.name,
            })
          }
          className={className}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};
export default PopularTags;
