import MenuList from './MenuList';
import * as React from 'react';
import Select, { Props as SelectProps } from 'react-select';
import { calcOptionsLength } from './util';


interface WindowedSelectProps extends SelectProps {
  windowThreshold: number
}

function WindowedSelect ({ windowThreshold = 100, ...passedProps }: WindowedSelectProps, ref) {
  var selectStyle = {
    selectButton: {
        display: "flex", 
        marginTop: '12px', 
        backgroundColor: 'green',
        color: 'black',
        fontSize: '13px',
        padding: '8px 30px',
        borderRadius: '5px'
    },
    removeButton: {
      display: "flex", 
      marginTop: '12px', 
      backgroundColor: 'red',
      color: 'black',
      fontSize: '13px',
      padding: '8px 30px',
      borderRadius: '5px',
      marginLeft: "3px"
    },
    buttonDisplay: {
      display: "flex",  
      paddingLeft: "30px"
    },
    selectPanel: {
      display: "flex",  
    },
    selectInput: {
      width: "130em"
    }
  }

  const optionsLength = React.useMemo(
    () => calcOptionsLength(passedProps.options),
    [passedProps.options]
  );
  
  const isWindowed = optionsLength >= windowThreshold;

  const options:any = passedProps.options;

  var isSelectAll = false;

  if ('selectAll' in passedProps){
    isSelectAll = true;
  }

  const [selectedValues, setSelectedValues] = React.useState<any[]>([]);

  return (
    <div style={selectStyle.selectPanel}>
      <div style={selectStyle.selectInput}>
        <Select
          {...passedProps}
          components={{
            ...passedProps.components,
            ...(
              isWindowed
                ? { MenuList }
                : {}
            )
          }}
          value={selectedValues}
          onChange={selected => {
            setSelectedValues(selected);
          }}
          ref={ref}
        />
    </div>
    { isSelectAll && (
      <div style={selectStyle.buttonDisplay}> 
        <button style={selectStyle.selectButton} onClick={ () => {setSelectedValues(options)}}>Select All</button>
        <button style={selectStyle.removeButton} onClick={ () => {setSelectedValues([])}}>Remove All</button>
      </div>
      )
    }
  </div>
  );
}

export default React.forwardRef(WindowedSelect);