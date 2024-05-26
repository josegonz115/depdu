import SuggestionCard from './SuggestionCard';
import { TSuggestions } from '../routes/ChatbotPage';

const Suggestions = ({sharedOptions}:{sharedOptions:TSuggestions[]}) => {


  return (
    <div className='w-full h-screen flex flex-col pr-20'>
      {sharedOptions && sharedOptions.length > 0 ? (
        <>
          <h3 className='w-full text-center my-5 text-4xl font-bold pt-5 text-black'>
            More information on contraceptives
          </h3>
          <div className='grid grid-cols-3 grid-flow-row place-items-center gap-10 my-10'>
            {sharedOptions.map((s, index) => (
              <SuggestionCard
                key={index}
                title={s.title}
                image={s.image}
                content={s.content}
                url={s.url}
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
