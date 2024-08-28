import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarIcon from '@mui/icons-material/Star';

function StarRating({rating}) {
  const stars = [];
  for (let i = 0; i < 5; i++) { 
    rating > i ? stars[i] = <StarIcon key={i}/> : stars[i] = <StarOutlineIcon key={i}/>;
  }
  if (rating % 1 != 0) stars[Math.floor(rating)] = <StarHalfIcon key={Math.floor} />;

  return (
    <div className='star-rating'>
      {stars}
    </div>
  )
}
export default StarRating