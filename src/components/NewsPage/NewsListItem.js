import ExpandablePanel from '../ExpandablePanel';

function NewsListItem({ news }) {
  const header = <>{news.title}, {news.byline}</>;
  return (
    <ExpandablePanel header={header}>
      <div className="text-xl">{news.abstract}, 
        <a href={news.short_url} target="blank" className="ml-1 italic text-blue-600 visited:text-purple-600">
        <br/>Click here to read the full article
        </a>
      </div>
    </ExpandablePanel>
  );
}

export default NewsListItem;
