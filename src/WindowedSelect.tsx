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
      display: "inline-block",
      textAlign: "center" as "center",
      whiteSpace:"nowrap" as "nowrap",
      verticalAlign: 'middle',
      border: '1px solid transparent',
      padding: '0.375rem 0.75rem',
      fontSize: '1rem',
      lineHeight: '1.5',
      borderRadius: '0.25rem',
      transition: 'color .15',
      borderColor: '#28a745',
      backgroundColor: '#28a745',
      color: '#fff',
      height: '2.5rem',
      width: '6rem'
    },
    removeButton: {
      display: "inline-block",
      textAlign: "center" as "center",
      whiteSpace:"nowrap" as "nowrap",
      verticalAlign: 'middle',
      border: '1px solid transparent',
      fontSize: '1rem',
      lineHeight: '1.5',
      borderRadius: '0.25rem',
      transition: 'color .15',
      borderColor: '#dc3545',
      backgroundColor: '#dc3545',
      color: '#fff',
      height: '2.5rem',
      width: '6rem',
    },
    buttonDisplay: {
      display: "flex",  
      paddingLeft: "10px"
    },
    selectPanel: {
      display: "flex",  
    },
    selectInput: {
      width: "130rem"
    }
  };

  const optionsLength = React.useMemo(
    () => calcOptionsLength(passedProps.options),
    [passedProps.options]
  );
  
  const isWindowed = optionsLength >= windowThreshold;

  var options:any = passedProps.options;

  if (options && options.length > 0 && options[0].options){
    var allGroupOptions: { value: string; lable: string }[] = [];
    for (var i=0; i< options.length; i++) {
      for(var j=0; j<options[i].options.length; j++){
        allGroupOptions.push(options[i].options[j]);
      }
    }
    console.log('all groups', allGroupOptions);
    options = allGroupOptions;
  }


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
        <div>
          <button style={selectStyle.selectButton} onClick={ () => {setSelectedValues(options)}}>Select All</button>
        </div>
        <div style={{paddingLeft: '0.5rem'}}>
          <button style={selectStyle.removeButton} onClick={ () => {setSelectedValues([])}}>Remove All</button>
        </div>
      </div>
      )
    }
  </div>
  );
}

export default React.forwardRef(WindowedSelect);