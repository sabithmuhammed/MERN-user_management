import { Button } from "react-bootstrap";
import { imagePath } from "../constants/constants";
import { useNavigate,Link } from "react-router-dom";
const UserTile = ({ image, name, email,id,handleShow }) => {
    const navigate = useNavigate()
    return (
        <tr>
            <td>
                <div className="image-preview">
                    {image && 
                    <img src={`${imagePath}/${image}`} alt="" />
                    }
                </div>
            </td>
            <td>{name}</td>
            <td>{email}</td>
            <td>
                <Link to={`/admin/update/${id}`}>

                    <Button >Update</Button>
                </Link>
                <Button className="btn-danger ms-3" onClick={()=>handleShow(id)}>Delete</Button>
            </td>
        </tr>
    );
};

export default UserTile;
