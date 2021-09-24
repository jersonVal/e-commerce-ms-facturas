import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {ProductoFactura, ProductoFacturaRelations, Factura} from '../models';
import {FacturaRepository} from './factura.repository';

export class ProductoFacturaRepository extends DefaultCrudRepository<
  ProductoFactura,
  typeof ProductoFactura.prototype.id,
  ProductoFacturaRelations
> {

  public readonly pertenece: BelongsToAccessor<Factura, typeof ProductoFactura.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(ProductoFactura, dataSource);
    this.pertenece = this.createBelongsToAccessorFor('pertenece', facturaRepositoryGetter,);
    this.registerInclusionResolver('pertenece', this.pertenece.inclusionResolver);
  }
}
