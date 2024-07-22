export async function getStaticPaths() {
  // Busque os caminhos possíveis para pré-renderizar
  // Por exemplo, de um banco de dados ou API

  return {
    paths: [],
    fallback: false, // ou true ou 'blocking' se necessário
  }
}

const testeRoute = async (route) => {
  return route
}

export async function getStaticProps({ params }) {
  // export const getStaticProps  = async (context) => {
  // export const getServerSideProps  = async (context) => {
  try {
    // const resolvedUrl = context.resolvedUrl;
    const resolvedUrl = params.routes
    // const content = await getDataPage(resolvedUrl);
    const content = await testeRoute(resolvedUrl)

    return {
      props: {
        content,
      },
    }
  } catch (error) {
    console.error('Erro na página:', error)

    return {
      props: {
        content: null,
      },
    }
  }
}
