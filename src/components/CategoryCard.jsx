import { MdDelete } from "react-icons/md";
import { Navigate, useNavigate } from "react-router-dom";

export default function CategoryCard({ categoryId, categoryName, handleDeleteCategory }) {
    
    const navigate = useNavigate();

    const onDeleteClick = () => {
        handleDeleteCategory(categoryId);
    };

    const listCategoryProducts = () => {
        navigate(`/merchant/category/${categoryId}`);
    }
    
    return (
        <div className="relative h-[160px] w-[160px] md:h-[200px] md:w-[200px] rounded-[20px] shadow-my flex items-center justify-center hover:cursor-pointer" onClick={listCategoryProducts}>
            <MdDelete className="absolute top-2 right-2 text-[20px] hover:cursor-pointer text-gray-800" onClick={onDeleteClick}/>
            <p className="text-[20px] md:text-[25px] font-semibold text-gray-700">{categoryName}</p>
        </div>
    )
}