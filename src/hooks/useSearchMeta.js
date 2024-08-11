const useSearchMeta = ({
  categories,
  locations,
  keyword
}) => {
  let title = ''
  let resultTitle = ''
  let description =
    'オーストラリアの生活情報ウェブサイト - Telopea。求人情報、不動産、中古品売買などの募集広告を無料で掲載できます。オーストラリアのローカル情報が満載。'
  if (categories.selected || locations.selected) {
    if (categories.selected && locations.selected) {
      title = keyword ?
        `${keyword} | ${locations.selected.name} | ${categories.selected.title}` :
        `${locations.selected.name} | ${categories.selected.title}`
      resultTitle = keyword ?
        `${keyword}の${locations.selected.name}の${categories.selected.title}` :
        `${locations.selected.name}の${categories.selected.title}`
      description = keyword ?
        `${keyword}の${locations.selected.name}の${categories.selected.title}一覧が掲載されています。${description}` :
        `${locations.selected.name}の${categories.selected.title}一覧が掲載されています。${description}`
    } else if (categories.selected || !locations.selected) {
      title = keyword ?
        `${keyword} | ${categories.selected.title}` :
        categories.selected.title
      resultTitle = keyword ?
        `${keyword}の${categories.selected.name}` :
        categories.selected.title
      description = keyword ?
        `${keyword}の${categories.selected.title}一覧が掲載されています。${description}` :
        `${categories.selected.title}一覧が掲載されています。${description}`
    } else if (!categories.selected || locations.selected) {
      title = keyword ?
        `${keyword} | ${locations.selected.name}` :
        locations.selected.name
      resultTitle = keyword ?
        `${locations.selected.name}の${keyword}の募集一覧` :
        `${locations.selected.name}の募集一覧`
      description = keyword ?
        `${locations.selected.name}の${keyword}一覧が掲載されています。${description}` :
        `${locations.selected.name}の募集一覧が掲載されています。${description}`
    }
  } else {
    title = keyword ? `${keyword}の募集一覧` : '募集一覧'
    resultTitle = keyword ? `${keyword}の検索結果` : '検索結果'
    description = keyword ?
      `${keyword}一覧が掲載されています。${description}` :
      `オーストラリアの募集一覧が掲載されています。${description}`
  }

  return {
    title,
    resultTitle,
    description
  }
}

export default useSearchMeta