import React from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';
import Select from 'react-select';
import _ from 'lodash';
import MultiSelect from './MultiSelect';

const initialValues = {
  dimensionFilter: [],
};

const options = [
  { value: false, label: 'Ascending' },
  { value: true, label: 'Descending' },
];
const ordertype = [
  { value: 'ALPHANUMERIC', label: 'alpha' },
  { value: 'NUMERIC', label: 'numeric' },
  { value: 'CASE_INSENSITIVE_ALPHANUMERIC', label: 'alpha (ignore case)' },
];
console.log(options);

const InviteFriends = () => (
  <div>
    <h1>Multi Select Form</h1>
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      {({ values }) => (
        <Form>
          <FieldArray name="dimensionFilter">
            {({ insert, remove, push }) => (
              <div>
                {values.dimensionFilter.length > 0 &&
                  values.dimensionFilter.map((dFilter, index) => (
                    <div className="row" key={index}>
                      {dFilter.filter && (
                        <div className="col">
                          <label
                            htmlFor={`dimensionFilter.${index}.filter.fieldName`}
                          >
                            Dimension
                          </label>
                          <Field
                            name={`dimensionFilter.${index}.filter.fieldName`}
                            placeholder="date"
                            type="text"
                          />
                          <Field
                            name={`dimensionFilter.${index}.filter.value`}
                            id={`dimensionFilter.${index}.filter.value`}
                            placeholder="Multi Select"
                            isMulti={true}
                            component={MultiSelect}
                            options={[
                              { value: 'one', label: 'One' },
                              { value: 'two', label: 'Two' },
                              { value: 'three', label: 'Three' },
                            ]}
                          />
                          {/* <Field
                          name={`dimensionFilter.${index}.filter.orderType`}
                        >
                          {({ field, form }) => (
                            <Select
                                defaultValue={ordertype[0]}
                                options={ordertype}
                                onChange={(selectedOption) =>
                                    form.setFieldValue(
                                      `dimensionFilter.${index}.filter`,
                                        selectedOption.value,
                                    )}
                            />
                            )}
                        </Field> */}
                          {/* <ErrorMessage
                          name={`dimensionFilter.${index}.dimension.dimensionName`}
                          component="div"
                          className="field-error"
                        /> */}
                        </div>
                      )}

                      <div className="col">
                        <button
                          type="button"
                          className="secondary"
                          onClick={() => remove(index)}
                        >
                          X
                        </button>
                      </div>

                      {dFilter.metric && (
                        <>
                          <div className="col">
                            <label
                              htmlFor={`dimensionFilter.${index}.metric.metricName`}
                            >
                              Metric
                            </label>
                            <Field
                              name={`dimensionFilter.${index}.metric.metricName`}
                              placeholder="sessions"
                              type="text"
                            />
                            <Field name={`dimensionFilter.${index}.desc`}>
                              {({ field, form }) => (
                                <Select
                                  defaultValue={options[0]}
                                  options={options}
                                  onChange={(selectedOption) =>
                                    form.setFieldValue(
                                      `dimensionFilter.${index}.desc`,
                                      selectedOption.value
                                    )
                                  }
                                />
                              )}
                            </Field>

                            <ErrorMessage
                              name={`dimensionFilter.${index}.metric.metricName`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              X
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                <button
                  type="button"
                  className="secondary"
                  onClick={() => push({ filter: { fieldName: '', value: [] } })}
                >
                  Add filter
                </button>
              </div>
            )}
          </FieldArray>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

ReactDOM.render(<InviteFriends />, document.getElementById('root'));
