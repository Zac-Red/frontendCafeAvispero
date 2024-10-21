import { Document, Text, Page, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  containerPage:{
    display: 'flex',
    textAlign: 'center'
  },
  table: {
    display: 'table',
    width: 'auto',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    margin: '10px 0',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '25%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    padding: 5,
  },
  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
});

function PDF({ data, columns, title }) {
  return (
    <Document>
      <Page style={styles.containerPage}>

        <Text >{title}</Text>
        <View style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            {columns.map((column, index) => (
              <View style={styles.tableCol} key={index}>
                <Text style={styles.tableCell}>{column.label}</Text>
              </View>
            ))}
          </View>
          {data.items.map((row) => (
            <View style={styles.tableRow} key={row.id}>
              {columns.map((column, index) => {
                const value = column.value.split('.').reduce((o, i) => o[i], row);
                return (
                  <View style={styles.tableCol} key={index}>
                    <Text style={styles.tableCell}>
                      {typeof value === "boolean" ? (value ? "Activo" : "Desactivado") : value}
                    </Text>
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  )
}


export default PDF;