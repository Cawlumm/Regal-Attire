import { useNavigate } from "react-router-dom";
import { DirectoryItemContainer, DirectoryItemBody, BackgroundImage } from "./directory-item.styles";

const DirectoryItem = ({category}) => {
    const {imageUrl, title, id, route} = category;
    const navigate = useNavigate();
    const onNavigateHandler = () => navigate(route);
    return (
      <DirectoryItemContainer key={id} onClick={onNavigateHandler}>
        <BackgroundImage
        imageUrl = {imageUrl}
        />
        <DirectoryItemBody>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </DirectoryItemBody>
      </DirectoryItemContainer>
    );
}

export default DirectoryItem;