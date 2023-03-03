import { Stack, Container, Center, Box } from '@chakra-ui/react'
import Categories from 'D:/Projects/my-website/src/Components/Category.js'
import Grilla from 'D:/Projects/my-website/src/Components//Grilla.js'
import Price from 'D:/Projects/my-website/src/Components//Price.js'
import Color from 'D:/Projects/my-website/src/Components//Color.js'
import Rating from 'D:/Projects/my-website/src/Components/Rating.js'
import Pagination from 'D:/Projects/my-website/src/Components/Pagination.js'
import { UserContext } from 'D:/Projects/my-website/src/Components/Context.js'
import { useContext, useEffect, useMemo } from 'react'


function App() {
  const { product, color, currentPage, minPrice, rating, maxPrice, sortByCat } = useContext(UserContext)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let conditions = {}
  if (sortByCat) { conditions['categoryId'] = sortByCat }
  if (color) { conditions['color'] = color }
  if (rating) { conditions['rating'] = rating }
  console.log(conditions, 'conditions')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getByPrice(array, min, max) {
    if (minPrice === undefined) return product.filter(ele => (ele['price'] <= maxPrice))
    else if (maxPrice === undefined) return product.filter(ele => (ele['price'] >= minPrice))
    else return product.filter(ele => (ele['price'] <= maxPrice && ele['price'] >= minPrice))
  }

  const productFiltered = useMemo(() => {
    if (minPrice || maxPrice) {
      return getByPrice(product, minPrice, maxPrice).filter(item => { return Object.keys(conditions).every(key => conditions[key] === item[key]) })
    }
    else if (!sortByCat && !color && !rating) { return getByPrice(product, minPrice, maxPrice) }
    else {
      return product.filter(item => {
        return Object.keys(conditions).every(key => conditions[key] === item[key])
      })
    }
  }, [minPrice, maxPrice, sortByCat, color, rating, getByPrice, product, conditions])

  const { setIdxPrev, setIdxNext } = useContext(UserContext)

  useEffect(() => {
    let limitPage = Math.ceil((productFiltered.length > 0 ? productFiltered : product).length / 4);
    if (currentPage === 1) {
      setIdxPrev(0); setIdxNext(4)
    }
    else if (currentPage === limitPage) {
      setIdxPrev(() => (currentPage - 1) * 4); setIdxNext(Infinity)
    }
    else { setIdxNext(() => currentPage * 4); setIdxPrev(() => (currentPage - 1) * 4) }
  }, [productFiltered, currentPage, product, setIdxPrev, setIdxNext])

  return (
    <Center bg='gray.100' >
      <Stack bg='gray.200' width='1000px' padding='30px' >
        <Categories />
        <Stack height='650px' direction='row' bg='gray.100' >
          <Stack justifyContent='space-between' borderRadius='md' bg='gray.100' >
            <Container paddingInlineStart='0px' width='250px' >
              <Price />
            </Container >
            <Container paddingInlineStart='0px' width='250px' >
              <Color />
            </Container >
            <Container paddingInlineStart='0px' width='250px' >
              <Rating />
            </Container >
          </Stack>
          <Grilla productFiltered={productFiltered} />
        </Stack>
        <Stack direction='row'>
          <Box width='350px' />
          <Pagination productFiltered={productFiltered} />
        </Stack>

      </Stack>
    </Center>

  );
};
export default App;
