import { useEffect, useState } from 'react';
import SuggestionCard, { IProductSuggestion } from './SuggestionCard';

const Suggestions = () => {
  const examples = [
    {
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
  ];

  const [suggestions, setSuggestions] = useState<IProductSuggestion[]>([]);

  useEffect(() => {
    setSuggestions([...examples]);
  }, []);

  return (
    <div className='w-full h-screen flex flex-col pr-20'>
      {suggestions && suggestions.length > 0 ? (
        <>
          <h3 className='w-full text-center my-5 text-4xl font-bold pt-5 text-black'>
            Top Picks for you
          </h3>
          <div className='grid grid-cols-3 grid-flow-row place-items-center gap-10 flex-grow'>
            {suggestions.map((s, index) => (
              <SuggestionCard
                key={index}
                name={s.name}
                pictureUrl={s.pictureUrl}
                description={s.description}
              />
            ))}
          </div>
        </>
      ) : (
        <h2 className='h-20 w-1/2 m-auto'>No suggestions yet 🥺</h2>
      )}
    </div>
  );
}

export default Suggestions;
