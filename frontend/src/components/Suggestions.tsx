import { useEffect, useState } from 'react';
import SuggestionCard, { IProductSuggestion } from './SuggestionCard';

const Suggestions = () => {
  const examples = [   {
    name: "Product 1",
    pictureUrl: "https://example.com/product1.jpg",
    description: "This is product 1",
  },
  {
    name: "Product 2",
    pictureUrl: "https://example.com/product2.jpg",
    description: "This is product 2",
  },
  {
    name: "Product 3",
    pictureUrl: "https://example.com/product3.jpg",
    description: "This is product 3",
  },
  {
    name: "Product 4",
    pictureUrl: "https://example.com/product4.jpg",
    description: "This is product 4",
  },
  {
    name: "Product 5",
    pictureUrl: "https://example.com/product5.jpg",
    description: "This is product 5",
  },
  {
    name: "Product 6",
    pictureUrl: "https://example.com/product6.jpg",
    description: "This is product 6",
  },
  {
    name: "Product 7",
    pictureUrl: "https://example.com/product7.jpg",
    description: "This is product 7",
  },
];

  const [suggestions, setSuggestions] = useState<IProductSuggestion[]>([]);

  useEffect(()=>{
    // setSuggestions(prevState => [...prevState, ...examples]);
    setSuggestions([...examples]);
  }, []);


  return (
    <div className='debug w-full my-auto'> {/* suggestions */}
        {suggestions && suggestions.length > 0 ? (
          <div className='grid grid-cols-3 grid-flow-row place-items-center *:my-10'>
          {suggestions.map((s)=> (
            <SuggestionCard name={s.name} pictureUrl={s.pictureUrl} description={s.description}/>
          ))}
          </div>
        ) : (
          <h2 className='h-20 w-1/2 m-auto'>No suggestions yet 🥺</h2>
        )}
    </div>
  )
}

export default Suggestions