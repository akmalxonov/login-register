import type { MenagerTypeApi } from "../../@types";
import { useQueryHandler } from "../../hooks/useQuery";
import "../menagers-components/menagers.scss";
const MenagersComponent = () => {
  const { data, isLoading, isError } = useQueryHandler<MenagerTypeApi[]>({
      pathname: "staff/all-managers",
      url: "staff/all-managers",
    });
    console.log(data);
    
    if (isLoading) return <div>Yuklanmoqda...</div>;
    if (isError) return <div>Xatolik yuz berdi.</div>;
  
    return (
      <div className="teachers">
        Ustozlar ro'yxati
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
            {isLoading || isError
              ? "Loading..."
              : data?.map((value) => (
                  <tr>
                    <th>{value.first_name}</th>
                    <th>{value.last_name}</th>
                    <th>{value.email}</th>
                    <th>{value.status}</th>
                    <th>...</th>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    );
};

export default MenagersComponent;
