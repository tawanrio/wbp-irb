import { useIntl } from 'react-intl'

export default function InsertTranslationMsg({
  keyTrans,
  tag: Tag = 'div',
  ...rest
}) {
  const intl = useIntl()

  return (
    <Tag
      {...rest}
      dangerouslySetInnerHTML={{ __html: intl.messages[keyTrans] }}
    />
  )
}
