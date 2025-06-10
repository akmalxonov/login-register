import { IoSearch } from "react-icons/io5";
import type { TeacherTypeApi } from "../../@types";
import { useQueryHandler } from "../../hooks/useQuery";
import "../teachers-components/teacher.scss";
import { useEffect, useState, type ChangeEvent } from "react";
const TeacherComponent = () => {
  const { data, isLoading, isError } = useQueryHandler<TeacherTypeApi[]>({
    pathname: "get-all-teachers",
    url: "teacher/get-all-teachers",
  });
  console.log(data);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isModalOpen2, setIsModalOpen2] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  searchText
    const filteredData = data?.filter((admin) =>
    `${admin.first_name} ${admin.last_name} ${admin.email}`
      .toLowerCase()
      .includes(inputText.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (isLoading) return <div>Yuklanmoqda...</div>;
  if (isError) return <div>Xatolik yuz berdi.</div>;

  return (
    <div className="teachers">
      <div className="top">
        <h1>Ustozlar ro'yxati</h1>
        <div className="search">
          <button onClick={() => setIsModalOpen(true)} className="search-btn">
            <IoSearch />
          </button>
        </div>
        <div className="add">
          <button onClick={() => setIsModalOpen2(true)}>+Ustoz qoshish</button>
        </div>
      </div>
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p onClick={() => setIsModalOpen(false)}>x</p>
            <h3>Search Teacher</h3>
            <input
              type="text"
              value={inputText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
              autoFocus
            />
            <div className="modal-actions">
              <button
                onClick={() => {
                  setSearchText(inputText); //
                  setIsModalOpen(false);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalOpen2 && (
        <div className="modal" onClick={() => setIsModalOpen2(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p onClick={() => setIsModalOpen2(false)}>x</p>
            <h3>Search Admins</h3>
            <input
              type="text"
              value={inputText}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setInputText(e.target.value)
              }
              autoFocus
            />
            <div className="modal-actions">
              <button
                onClick={() => {
                  setSearchText(inputText); //
                  setIsModalOpen2(false);
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}



      <table className="list">
        <thead>
          <tr>
            <th>Ism</th>
            <th>Famillya</th>
            <th>Email</th>
            <th>Holat</th>
            <th>Amallar</th>
          </tr>
        </thead>
        <tbody>
          {(filteredData || []).map((value) => (
            <tr key={value.first_name}>
              <td>{value.first_name}</td>
              <td>{value.last_name}</td>
              <td>{value.email}</td>
              <td>{value.status}</td>
              <td>...</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherComponent;
