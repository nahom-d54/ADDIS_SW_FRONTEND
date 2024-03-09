import { css } from '@emotion/react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Flex } from 'rebass'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons'
import { isLoading } from '../redux/slices/musics'


const Pagination = () => {
  const dispatch = useDispatch()
  const musicData = useSelector(state => state.musics)

  const getPageNumbers = ( prev, next, last  ) => {
    const currentPage = prev ? prev + 1 : next ? next - 1 : 1;
    const rangeStart = currentPage;
    const rangeEnd = Math.min(currentPage + 3, last);

    const pageNumbers = [];
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pageNumbers.push(i);
    }
    return [pageNumbers, currentPage];
  };

  return (
    <Flex css={css`gap:.3rem;margin: 1rem auto;`} className='pagination'>
      <Button
        onClick={() => dispatch({ type: isLoading.type , payload: { page: musicData.prev } })}
        disabled={!musicData.prev}
      >
        <FontAwesomeIcon icon={faArrowLeft}/>
      </Button>
      
      {getPageNumbers(musicData.prev, musicData.next, musicData.last)[0].map(pageNo => (
        <Button
          key={pageNo}
          onClick={() => dispatch({ type: isLoading.type , payload: { page: pageNo } })}
          disabled={getPageNumbers(musicData.prev, musicData.next, musicData.last)[1] == pageNo}
        >
          {pageNo}
        </Button>
      ))}
      <Button
        onClick={() => dispatch({ type: isLoading.type , payload: { page: musicData.next } })}
        disabled={!musicData.next}
      >
        <FontAwesomeIcon icon={faArrowRight}/>
      </Button>
    </Flex>
  );
};

export default Pagination;